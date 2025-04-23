import useQueryConfig from './useQueryConfig'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { omit } from 'lodash'
import * as yup from 'yup'
import path from '../constants/path'


type FromData = {
  name?: string
}

const nameSchema = yup.object({
  name: yup.string().optional()
})

export default function useSearchProducts() {
  const queryConfig = useQueryConfig()
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<FromData>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(nameSchema)
  })

  const onSubmitSearch = handleSubmit((data) => {
    const config = queryConfig.name
      ? omit(
          {
            ...queryConfig,
            name: data.name
          },
          ['order', 'sort_by']
        )
      : {
          ...queryConfig,
          name: data.name
        }
    navigate({
      pathname: path.home,
      search: createSearchParams(config).toString()
    })
  })

  return {
    onSubmitSearch,
    register
  }
}
