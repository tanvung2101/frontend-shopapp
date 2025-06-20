import i18n from "i18next";
import { initReactI18next } from "react-i18next";


export const locales = {
    en: "English",
    vi: "Tiếng việt"
}

const resources = {
      en: {
        translation: {
          "all categories": "All Categories",
          'search filter': 'Search Filter',
          "price range filter": "Price range filter",
          "rating filter": "Rating filter",
          "clear all filters": "Clear all filters",
          "apply": "Apply",
          "and up": "and up",
          "sign up": "Sign up",
          "Sort by": "Sort by",
          "most popular": "Most popular",
          "newest": "Newest",
          "top sellers": "Top Sellers",
          "price": "Giá"
        }
      },
      vi: {
        translation: {
          "all categories": "Tất cả danh mục",
          "search filter": "Bộ lọc tìm kiếm",
          "price range filter": "Khoản giá",
          "rating filter": "Đánh giá",
          "clear all filters": "Xóa tất cả",
          "apply": "Áp dụng",
          "and up": "trở lên",
          "sign up" : "Đăng kí",
          "sort by": "Sắp xếp theo",
          "most popular": "Phổ biến",
          "newest": "Mới nhất",
          "top sellers": "Bán chạy",
          "price": "Giá"
        }
      },
    }
i18n
  .use(initReactI18next) 
  .init({
    resources,
    lng: "vi", // if you're using a language detector, do not define the lng option
    fallbackLng: "vi",

    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });

