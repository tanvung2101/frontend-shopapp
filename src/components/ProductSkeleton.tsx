function ProductSkeleton() {
    return (
      <div className="bg-white shadow rounded-sm hover:translate-y-[-0.4rem] hover:shadow-md duration-100 transition-transform overflow-hidden animate-pulse">
        <div className="w-full pt-[100%] relative bg-gray-300"></div>
        <div className="p-2 overflow-hidden">
          <div className="min-h-[2rem] line-clamp-2 text-xs bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="flex items-center mt-3">
            <div className="line-through max-w-[50%] text-gray-500 truncate bg-gray-300 rounded w-1/4 h-4"></div>
            <div className="text-orange truncate ml-1 bg-gray-300 rounded w-1/4 h-4"></div>
          </div>
          <div className="mt-3 flex items-center justify-end">
            <div className="bg-gray-300 w-16 h-4 rounded"></div>
            <div className="ml-2 text-sm bg-gray-300 rounded w-12 h-4"></div>
          </div>
        </div>
      </div>
    );
  }

export default ProductSkeleton