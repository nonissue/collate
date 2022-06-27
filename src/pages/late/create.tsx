import { useForm } from "react-hook-form";
import { Prisma, Late } from "@prisma/client";

type FormValues = Omit<Prisma.LateCreateInput, "owner" | "category" | "tags">;

const test = Prisma.validator<Prisma.LateArgs>()({
  select: { tags: false, category: false, owner: false },
});

type lateFormValues = Late;

export default function LateCreate() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    // } = useForm<Omit<Prisma.LateCreateInput, "owner" | "category" | "tags">>();
  } = useForm<lateFormValues>();

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <form onSubmit={onSubmit}>
      <label>First Name</label>
      <input {...register("url")} />
      <label>Last Name</label>
      <input {...register("title")} />
      <button
        type="button"
        onClick={() => {
          setValue("url", "luo"); // ✅
          setValue("title", "hhihis"); // ❌: true is not string
        }}
      >
        SetValue
      </button>
    </form>
  );
}
