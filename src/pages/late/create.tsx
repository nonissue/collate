import { useForm } from "react-hook-form";
import { Late } from "@prisma/client";
import { ReactElement } from "react";

import React from "react";

// type FormValues = Omit<Prisma.LateCreateInput, "owner" | "category" | "tags">;

// const test = Prisma.validator<Prisma.LateArgs>()({
//   select: { tags: false, category: false, owner: false },
// });

type lateFormValues = Late;

// type test = Prisma.LateCreateArgs;

type FormGroupProps = {
  labelText: string;
  children: ReactElement;
  groupStyle?: string;
};

const FormGroup = ({ labelText, children, groupStyle }: FormGroupProps) => {
  const StyledFormInput = React.cloneElement(children, {
    className: `${children.props.className} mt-1 block w-full rounded-md border-indigo-200 shadow-sm focus:border-indigo-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-20 `,
  });

  return (
    <label className={`block ${groupStyle}`}>
      <span className="text-sm font-[400] text-slate-500">{labelText}</span>

      {StyledFormInput}
    </label>
  );
};

const FormCheckbox = ({ labelText, children }: FormGroupProps) => {
  const StyledFormInput = React.cloneElement(children, {
    className: `${children.props.className}  rounded scale-[80%] border-indigo-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-20`,
  });

  return (
    <label className="flex items-center justify-center px-1">
      {StyledFormInput}
      <span className="p-1 text-sm font-[400] text-slate-500 ">
        {labelText}
      </span>
    </label>
  );
};

export default function LateCreate() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // } = useForm<Omit<Prisma.LateCreateInput, "owner" | "category" | "tags">>();
  } = useForm<lateFormValues>();

  const onSubmit = handleSubmit((data) => console.log(data));
  console.log(errors);

  return (
    <div className="mx-auto grid max-w-lg space-y-4 border-t-4 border-slate-300 p-4 font-sans text-slate-600 sm:mx-auto sm:px-0 md:mt-[10vh] md:max-w-2xl md:space-y-4 md:rounded-2xl md:border-2 md:border-indigo-200 md:p-6 md:shadow-md md:shadow-indigo-900/[6%] ">
      <h1 className="text-xl font-semibold tracking-tight text-indigo-800">
        Create Late
      </h1>
      <form onSubmit={onSubmit} className="grid gap-4 py-2 md:grid-cols-2">
        <FormGroup labelText="URL">
          <input {...register("url")} type="url" />
        </FormGroup>
        <FormGroup labelText="Title">
          <input {...register("title")} type="text" />
        </FormGroup>

        <FormGroup labelText="Content">
          <input {...register("content")} type="text" />
        </FormGroup>
        <FormGroup labelText="Tags">
          <select {...register("notes")} />
        </FormGroup>
        <FormGroup labelText="Notes" groupStyle="md:col-span-2">
          <textarea {...register("notes")} />
        </FormGroup>
        <div className="grid grid-cols-1 content-center gap-4 md:col-span-1">
          <div className="grid grid-cols-3 divide-x  divide-indigo-100 py-2 ">
            <FormCheckbox labelText="Favorite">
              <input {...register("favorite")} type="checkbox" />
            </FormCheckbox>
            <FormCheckbox labelText="Stack">
              <input {...register("stack")} type="checkbox" />
            </FormCheckbox>
            <FormCheckbox labelText="Publish">
              <input {...register("published")} type="checkbox" />
            </FormCheckbox>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onSubmit()}
          className="form-input col-span-1 m-1 block rounded-md border-2 border-indigo-300 bg-indigo-50/0 text-sm font-semibold text-indigo-500 shadow-sm  duration-200 hover:border-indigo-500 hover:bg-white hover:text-indigo-700 hover:ring hover:ring-indigo-200 hover:ring-opacity-20 md:col-start-2"
        >
          Create Late
        </button>
      </form>
    </div>
  );
}
