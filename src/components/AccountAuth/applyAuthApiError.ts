import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { AuthApiError, type AuthFieldName } from "../../api/auth/authApiErrors";

type ApplyAuthApiErrorOptions<T extends FieldValues> = {
  error: unknown;
  form: UseFormReturn<T>;
  fieldMap: Partial<Record<AuthFieldName, Path<T>>>;
  setFormError: (message: string | null) => void;
  fallback: string;
};

export const applyAuthApiError = <T extends FieldValues>({
  error,
  form,
  fieldMap,
  setFormError,
  fallback,
}: ApplyAuthApiErrorOptions<T>): void => {
  if (!(error instanceof AuthApiError)) {
    setFormError(error instanceof Error ? error.message : fallback);
    return;
  }

  let appliedFieldError = false;

  for (const [apiField, formField] of Object.entries(fieldMap) as Array<
    [AuthFieldName, Path<T>]
  >) {
    const message = error.fieldErrors[apiField];
    if (!message || !formField) continue;

    form.setError(formField, { type: "server", message });
    appliedFieldError = true;
  }

  if (error.message) {
    setFormError(error.message);
    return;
  }

  if (!appliedFieldError) {
    setFormError(fallback);
    return;
  }

  setFormError(null);
};
