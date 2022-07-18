import { useForm } from "react-hook-form";
import { Prisma, Late } from "@prisma/client";
import { ReactElement } from "react";

import React from "react";

type FormValues = Omit<Prisma.LateCreateInput, "owner" | "category" | "tags">;

// const test = Prisma.validator<Prisma.LateArgs>()({
//   select: { tags: false, category: false, owner: false },
// });

type lateFormValues = Late;

type test = Prisma.LateCreateArgs;

type FormGroupProps = {
  labelText: string;
  children: ReactElement;
  groupStyle?: string;
};

const FormGroup = ({ labelText, children, groupStyle }: FormGroupProps) => {
  const StyledFormInput = React.cloneElement(children, {
    className: `${children.props.className} mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-20 `,
  });

  return (
    <label className={`block ${groupStyle}`}>
      <span className="text-slate-500 text-sm font-[400]">{labelText}</span>

      {StyledFormInput}
    </label>
  );
};

const FormCheckbox = ({ labelText, children }: FormGroupProps) => {
  const StyledFormInput = React.cloneElement(children, {
    className: `${children.props.className}  rounded-md scale-[80%] border-slate-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-20`,
  });

  return (
    <label className="flex items-center px-1 justify-center">
      {StyledFormInput}
      <span className="text-slate-500 text-sm font-[400] p-1 ">
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

  return (
    <div className="max-w-xl p-4 mx-auto mt-24 grid py-4 divide-y-2 divide-slate-200 border-slate-200 border-b-2 text-slate-600">
      <h1 className="font-sans font-semibold  tracking-tight text-xl text-indigo-800 py-4">
        Create Late
      </h1>
      <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-4 pt-4">
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
        <div className="grid grid-cols-1 md:col-span-1 gap-4 content-center">
          <div className="grid grid-cols-3 ">
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
          className="m-1 col-span-1 md:col-start-2 text-sm font-semibold text-indigo-500 bg-indigo-50/0 border-2 block form-input rounded-md border-indigo-300  shadow-sm hover:border-indigo-500 hover:ring hover:ring-indigo-200 hover:text-indigo-700 hover:ring-opacity-20 hover:bg-white duration-200"
        >
          Create Late
        </button>
      </form>
    </div>
  );
}
