import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import * as auth from "../api/auth/authApi";
import * as orders from "../api/order/orderApi";
import * as catalog from "../api/catalog/catalogApi";
import * as homeCatalog from "../api/home/catalogApi";
import * as home from "../api/home/homeApi";
import * as products from "../api/product/productApi";
import * as newIn from "../api/new-in/newInApi";
import * as cdek from "../api/delivery/cdekApi";
import * as yandex from "../api/delivery/yandexApi";
import * as address from "../api/delivery/addressSuggestApi";
import * as discounts from "../api/discounts/discountsApi";
import * as mailing from "../api/mailing/mailingApi";
import type { AuthFieldErrors } from "../api/auth/authApiErrors";

export interface ApiError { message: string; status?: number; fieldErrors?: AuthFieldErrors }
type Result<F extends (...args: never[]) => unknown> = Awaited<ReturnType<F>> extends void ? null : Awaited<ReturnType<F>>;
export function toApiError(error: unknown): ApiError {
  if (error instanceof auth.AuthApiError) return { message: error.message, fieldErrors: error.fieldErrors };
  if (error instanceof Error) return { message: error.message };
  return { message: typeof error === "string" ? error : "Не удалось выполнить запрос" };
}
async function run<T>(work: () => Promise<T>): Promise<{ data: T } | { error: ApiError }> {
  try { return { data: await work() }; }
  catch (error) { return { error: toApiError(error) }; }
}
type GeocodeResult = { lat?: number; lon?: number; city?: string; street?: string; house?: string; fullAddress?: string; error?: string };
type CdekEstimate = { price?: number; days_min?: number; days_max?: number; from_api?: boolean; reason?: string };
export const shopApi = createApi({
  reducerPath: "shopApi",
  baseQuery: fakeBaseQuery<ApiError>(),
  tagTypes: ["User", "Orders", "Catalog", "Product", "Home", "Delivery", "Promo"],
  keepUnusedDataFor: 60,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getDeliveryConfig: builder.query<{ yaDeliverySourceAddress?: string; cdekConfigured?: boolean }, void>({
      queryFn: (_arg, api) => run(async () => {
        const response = await fetch("/api/delivery/config", { signal: api.signal });
        if (!response.ok) throw new Error("Не удалось получить настройки доставки");
        return response.json();
      }),
      providesTags: ["Delivery"],
    }),
    getCdekEstimate: builder.query<CdekEstimate | null, { city: string; weightGrams: number }>({
      queryFn: (arg, api) => run(async () => {
        const response = await fetch(`/api/cdek/calculate?${new URLSearchParams({ city: arg.city, weight_grams: String(arg.weightGrams) })}`, { signal: api.signal });
        return response.ok || response.status === 503 ? response.json() : null;
      }),
      providesTags: ["Delivery"],
    }),
    reverseGeocode: builder.query<GeocodeResult, { lat: number; lon: number }>({
      queryFn: (arg, api) => run(async () => {
        const response = await fetch(`/api/reverse-geocode?${new URLSearchParams({ lat: String(arg.lat), lon: String(arg.lon) })}`, { signal: api.signal });
        if (!response.ok) throw new Error("Не удалось определить адрес");
        return response.json();
      }),
      providesTags: ["Delivery"],
    }),
    geocode: builder.query<GeocodeResult, string>({
      queryFn: (query, api) => run(async () => {
        const response = await fetch(`/api/geocode?${new URLSearchParams({ address: query })}`, { signal: api.signal });
        if (!response.ok) throw new Error("Не удалось найти адрес");
        return response.json();
      }),
      providesTags: ["Delivery"],
    }),
    logout: builder.mutation<null, void>({
      queryFn: () => run(async () => { await auth.logoutUser(); return null; }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(shopApi.util.resetApiState());
          await dispatch(shopApi.util.upsertQueryData("getCurrentUser", undefined, null));
        } catch { /* The caller reports logout failure; retain the current session. */ }
      },
    }),
    getCurrentUser: builder.query<Result<typeof auth.getCurrentUser>, void>({
      queryFn: () => run(() => auth.getCurrentUser()),
      providesTags: ["User"],
    }),
    getCurrentUserWithRetry: builder.query<Result<typeof auth.getCurrentUserWithRetry>, void>({
      queryFn: () => run(() => auth.getCurrentUserWithRetry()),
      providesTags: ["User"],
    }),
    register: builder.mutation<Result<typeof auth.registerUser>, Parameters<typeof auth.registerUser>[0]>({
      queryFn: (arg) => run(async () => { await auth.registerUser(arg); return null; }),
      invalidatesTags: ["User"],
    }),
    verifyRegistration: builder.mutation<Result<typeof auth.verifyRegistration>, Parameters<typeof auth.verifyRegistration>[0]>({
      queryFn: (arg) => run(() => auth.verifyRegistration(arg)),
      invalidatesTags: ["User", "Orders"],
    }),
    login: builder.mutation<Result<typeof auth.loginUser>, Parameters<typeof auth.loginUser>[0]>({
      queryFn: (arg) => run(async () => { await auth.loginUser(arg); return null; }),
      invalidatesTags: ["User"],
    }),
    verifyLogin: builder.mutation<Result<typeof auth.verifyLogin>, Parameters<typeof auth.verifyLogin>[0]>({
      queryFn: (arg) => run(() => auth.verifyLogin(arg)),
      invalidatesTags: ["User", "Orders"],
    }),
    resendAuthCode: builder.mutation<Result<typeof auth.resendAuthCode>, Parameters<typeof auth.resendAuthCode>[0]>({
      queryFn: (arg) => run(async () => { await auth.resendAuthCode(arg); return null; }),
      invalidatesTags: ["User"],
    }),
    requestPasswordReset: builder.mutation<Result<typeof auth.requestPasswordReset>, Parameters<typeof auth.requestPasswordReset>[0]>({
      queryFn: (arg) => run(async () => { await auth.requestPasswordReset(arg); return null; }),
      invalidatesTags: ["User"],
    }),
    changePasswordWithResetToken: builder.mutation<Result<typeof auth.changePasswordWithResetToken>, Parameters<typeof auth.changePasswordWithResetToken>[0]>({
      queryFn: (arg) => run(async () => { await auth.changePasswordWithResetToken(arg); return null; }),
      invalidatesTags: ["User", "Orders"],
    }),
    updateCurrentUser: builder.mutation<Result<typeof auth.updateCurrentUser>, Parameters<typeof auth.updateCurrentUser>[0]>({
      queryFn: (arg) => run(() => auth.updateCurrentUser(arg)),
      invalidatesTags: ["User"],
    }),
    updateUserDeliveryData: builder.mutation<Result<typeof auth.updateUserDeliveryData>, Parameters<typeof auth.updateUserDeliveryData>[0]>({
      queryFn: (arg) => run(() => auth.updateUserDeliveryData(arg)),
      invalidatesTags: ["User"],
    }),
    changePassword: builder.mutation<Result<typeof auth.changePassword>, Parameters<typeof auth.changePassword>[0]>({
      queryFn: (arg) => run(async () => { await auth.changePassword(arg); return null; }),
      invalidatesTags: ["User"],
    }),
    verifyPasswordResetCode: builder.mutation<Result<typeof auth.verifyPasswordResetCode>, { email: string; code: string }>({
      queryFn: (arg) => run(async () => { await auth.verifyPasswordResetCode(arg.email, arg.code); return null; }),
      invalidatesTags: [],
    }),
    getMyOrders: builder.query<Result<typeof orders.getMyOrders>, boolean>({
      queryFn: (arg) => run(() => orders.getMyOrders(arg)),
      providesTags: ["Orders"],
    }),
    getAccountOrders: builder.query<Result<typeof orders.fetchAccountOrders>, void>({
      queryFn: () => run(() => orders.fetchAccountOrders()),
      providesTags: ["Orders"],
    }),
    createOrder: builder.mutation<Result<typeof orders.createOrder>, orders.OrderRequest>({
      queryFn: (arg) => run(() => orders.createOrder(arg)),
      invalidatesTags: ["Orders"],
    }),
    checkoutOrder: builder.mutation<Result<typeof orders.checkoutOrder>, { order: orders.OrderRequest; paymentProvider: "yookassa" | "yandex" | null }>({
      queryFn: (arg) => run(() => orders.checkoutOrder(arg.order, arg.paymentProvider)),
      invalidatesTags: (_result, error) => error ? [] : ["Orders", "Catalog", "Product"],
    }),
    getPaymentUrl: builder.mutation<Result<typeof orders.getPaymentUrl>, { orderId: number; options?: Omit<orders.PaymentUrlRequest, "access_token"> }>({
      queryFn: (arg) => run(() => orders.getPaymentUrl(arg.orderId, arg.options)),
      invalidatesTags: (_result, error) => error ? [] : ["Orders", "Catalog", "Product"],
    }),
    getYandexPaymentUrl: builder.mutation<Result<typeof orders.getYandexPaymentUrl>, { orderId: number; options?: Omit<orders.PaymentUrlRequest, "access_token"> }>({
      queryFn: (arg) => run(() => orders.getYandexPaymentUrl(arg.orderId, arg.options)),
      invalidatesTags: (_result, error) => error ? [] : ["Orders", "Catalog", "Product"],
    }),
    getCatalogProductsPage: builder.query<Result<typeof catalog.fetchCatalogProductsPage>, Parameters<typeof catalog.fetchCatalogProductsPage>[0]>({
      queryFn: (arg) => run(() => catalog.fetchCatalogProductsPage(arg)),
      providesTags: ["Catalog"],
    }),
    getCatalogProducts: builder.query<Result<typeof catalog.fetchCatalogProducts>, Parameters<typeof catalog.fetchCatalogProducts>[0]>({
      queryFn: (arg) => run(() => catalog.fetchCatalogProducts(arg)),
      providesTags: ["Catalog"],
    }),
    getCatalogProductsByCategory: builder.query<Result<typeof catalog.fetchCatalogProductsByCategory>, string | undefined>({
      queryFn: (arg) => run(() => catalog.fetchCatalogProductsByCategory(arg)),
      providesTags: ["Catalog"],
    }),
    getCatalogProductsPageByCategory: builder.query<Result<typeof catalog.fetchCatalogProductsPageByCategory>, { category?: string; page?: number; pageSize?: number }>({
      queryFn: (arg) => run(() => catalog.fetchCatalogProductsPageByCategory(arg.category, arg.page, arg.pageSize)),
      providesTags: ["Catalog"],
    }),
    getCategories: builder.query<Result<typeof catalog.fetchCatalogCategories>, void>({
      queryFn: () => run(() => catalog.fetchCatalogCategories()),
      providesTags: ["Catalog"],
    }),
    getColors: builder.query<Result<typeof catalog.fetchCatalogColors>, void>({
      queryFn: () => run(() => catalog.fetchCatalogColors()),
      providesTags: ["Catalog"],
    }),
    getSizes: builder.query<Result<typeof catalog.fetchCatalogSizes>, void>({
      queryFn: () => run(() => catalog.fetchCatalogSizes()),
      providesTags: ["Catalog"],
    }),
    getProduct: builder.query<Result<typeof products.fetchProductBySlug>, string>({
      queryFn: (arg) => run(() => products.fetchProductBySlug(arg)),
      providesTags: ["Product"],
    }),
    getProductWithWarehouse: builder.query<Result<typeof products.fetchProductWithWarehouse>, string>({
      queryFn: (arg) => run(() => products.fetchProductWithWarehouse(arg)),
      providesTags: ["Product"],
    }),
    getProductRaw: builder.query<Result<typeof products.fetchCatalogProductRaw>, string>({
      queryFn: (arg) => run(() => products.fetchCatalogProductRaw(arg)),
      providesTags: ["Product"],
    }),
    getProductImages: builder.query<Result<typeof products.fetchProductImagesByColor>, { productSlug: string; colorSlug: string }>({
      queryFn: (arg) => run(() => products.fetchProductImagesByColor(arg.productSlug, arg.colorSlug)),
      providesTags: ["Product"],
    }),
    getNewInProducts: builder.query<Result<typeof newIn.fetchNewInProducts>, string | undefined>({
      queryFn: (arg) => run(() => newIn.fetchNewInProducts(arg)),
      providesTags: ["Catalog"],
    }),
    getHomePage: builder.query<Result<typeof home.fetchHomePage>, void>({
      queryFn: () => run(() => home.fetchHomePage()),
      providesTags: ["Home"],
    }),
    getHomeCatalogProducts: builder.query<Result<typeof homeCatalog.fetchCatalogProducts>, Parameters<typeof homeCatalog.fetchCatalogProducts>[0]>({
      queryFn: (arg) => run(() => homeCatalog.fetchCatalogProducts(arg)),
      providesTags: ["Catalog"],
    }),
    getHomeNewInProducts: builder.query<Result<typeof homeCatalog.fetchNewInProducts>, void>({
      queryFn: () => run(() => homeCatalog.fetchNewInProducts()),
      providesTags: ["Catalog"],
    }),
    getAllCatalogProducts: builder.query<Result<typeof homeCatalog.fetchAllCatalogProducts>, void>({
      queryFn: () => run(() => homeCatalog.fetchAllCatalogProducts()),
      providesTags: ["Catalog"],
    }),
    getCdekPvzByCity: builder.query<Result<typeof cdek.getCdekPvzByCity>, string>({
      queryFn: (arg, api) => run(() => cdek.getCdekPvzByCity(arg, api.signal)),
      providesTags: ["Delivery"],
    }),
    getCdekPvzByCoords: builder.query<Result<typeof cdek.getCdekPvzByCoords>, { lat: number; lon: number; fallbackCity?: string }>({
      queryFn: (arg, api) => run(() => cdek.getCdekPvzByCoords(arg.lat, arg.lon, arg.fallbackCity, api.signal)),
      providesTags: ["Delivery"],
    }),
    getYandexPvzByCity: builder.query<Result<typeof yandex.getYandexPvzByCity>, string>({
      queryFn: (arg, api) => run(() => yandex.getYandexPvzByCity(arg, api.signal)),
      providesTags: ["Delivery"],
    }),
    getYandexPvzByCoords: builder.query<Result<typeof yandex.getYandexPvzByCoords>, { lat: number; lon: number; fallbackCity?: string }>({
      queryFn: (arg, api) => run(() => yandex.getYandexPvzByCoords(arg.lat, arg.lon, arg.fallbackCity, api.signal)),
      providesTags: ["Delivery"],
    }),
    getAddressSuggestions: builder.query<Result<typeof address.getAddressSuggestions>, string>({
      queryFn: (arg, api) => run(() => address.getAddressSuggestions(arg, api.signal)),
      providesTags: ["Delivery"],
    }),
    applyPromoCode: builder.mutation<Result<typeof discounts.applyPromoCode>, { promoCode: string; params: Parameters<typeof discounts.applyPromoCode>[1] }>({
      queryFn: (arg) => run(() => discounts.applyPromoCode(arg.promoCode, arg.params)),
      invalidatesTags: ["Promo"],
    }),
    subscribeToMailing: builder.mutation<Result<typeof mailing.subscribeToMailing>, string>({
      queryFn: (arg) => run(async () => { await mailing.subscribeToMailing(arg); return null; }),
      invalidatesTags: [],
    }),
    getCourierEstimate: builder.query<Record<string, unknown>, Record<string, string>>({
      queryFn: (params, api) => run(async () => {
        const response = await fetch(`/api/yandex/courier/calculate?${new URLSearchParams(params)}`, { signal: api.signal });
        if (!response.ok) throw new Error("Не удалось рассчитать доставку");
        return response.json();
      }),
      providesTags: ["Delivery"],
    }),
  }),
});
export const api = shopApi;
export const {
  useGetDeliveryConfigQuery, useLazyGetDeliveryConfigQuery,
  useGetCdekEstimateQuery, useLazyGetCdekEstimateQuery,
  useReverseGeocodeQuery, useLazyReverseGeocodeQuery,
  useGeocodeQuery, useLazyGeocodeQuery,
  useLogoutMutation,
  useGetCurrentUserQuery,
  useLazyGetCurrentUserQuery,
  useGetCurrentUserWithRetryQuery,
  useLazyGetCurrentUserWithRetryQuery,
  useRegisterMutation,
  useVerifyRegistrationMutation,
  useLoginMutation,
  useVerifyLoginMutation,
  useResendAuthCodeMutation,
  useRequestPasswordResetMutation,
  useChangePasswordWithResetTokenMutation,
  useUpdateCurrentUserMutation,
  useUpdateUserDeliveryDataMutation,
  useChangePasswordMutation,
  useVerifyPasswordResetCodeMutation,
  useGetMyOrdersQuery,
  useLazyGetMyOrdersQuery,
  useGetAccountOrdersQuery,
  useLazyGetAccountOrdersQuery,
  useCreateOrderMutation,
  useCheckoutOrderMutation,
  useGetPaymentUrlMutation,
  useGetYandexPaymentUrlMutation,
  useGetCatalogProductsPageQuery,
  useLazyGetCatalogProductsPageQuery,
  useGetCatalogProductsQuery,
  useLazyGetCatalogProductsQuery,
  useGetCatalogProductsByCategoryQuery,
  useLazyGetCatalogProductsByCategoryQuery,
  useGetCatalogProductsPageByCategoryQuery,
  useLazyGetCatalogProductsPageByCategoryQuery,
  useGetCategoriesQuery,
  useLazyGetCategoriesQuery,
  useGetColorsQuery,
  useLazyGetColorsQuery,
  useGetSizesQuery,
  useLazyGetSizesQuery,
  useGetProductQuery,
  useLazyGetProductQuery,
  useGetProductWithWarehouseQuery,
  useLazyGetProductWithWarehouseQuery,
  useGetProductRawQuery,
  useLazyGetProductRawQuery,
  useGetProductImagesQuery,
  useLazyGetProductImagesQuery,
  useGetNewInProductsQuery,
  useLazyGetNewInProductsQuery,
  useGetHomePageQuery,
  useLazyGetHomePageQuery,
  useGetHomeCatalogProductsQuery,
  useLazyGetHomeCatalogProductsQuery,
  useGetHomeNewInProductsQuery,
  useLazyGetHomeNewInProductsQuery,
  useGetAllCatalogProductsQuery,
  useLazyGetAllCatalogProductsQuery,
  useGetCdekPvzByCityQuery,
  useLazyGetCdekPvzByCityQuery,
  useGetCdekPvzByCoordsQuery,
  useLazyGetCdekPvzByCoordsQuery,
  useGetYandexPvzByCityQuery,
  useLazyGetYandexPvzByCityQuery,
  useGetYandexPvzByCoordsQuery,
  useLazyGetYandexPvzByCoordsQuery,
  useGetAddressSuggestionsQuery,
  useLazyGetAddressSuggestionsQuery,
  useApplyPromoCodeMutation,
  useSubscribeToMailingMutation,
  useGetCourierEstimateQuery,
  useLazyGetCourierEstimateQuery,
} = shopApi;
export const useLazyGetCatalogProductRawQuery = useLazyGetProductRawQuery;
export const useLazyGetCatalogColorsQuery = useLazyGetColorsQuery;
export const useLoginUserMutation = useLoginMutation;
export const useRegisterUserMutation = useRegisterMutation;

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (error && typeof error === "object" && "message" in error && typeof error.message === "string") return error.message;
  return fallback;
}
