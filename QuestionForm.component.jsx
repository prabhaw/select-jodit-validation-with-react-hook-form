import Jodit from "./../Editor/JoditEditor.component";
import { useForm, Controller } from "react-hook-form";
import ReactSelect from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const QuestionForm = (props) => {
  const { handleSubmit, control, errors, reset } = useForm({
    mode: "all",
    // reValidateMode: "all",
    defaultValues: {
      question: "",
      category: "",
      description: "",
    },
    criteriaMode: "firstError",
    shouldFocusError: true,
    shouldUnregister: true,
  });

  const onSubmit = handleSubmit((values) => {
    console.log({
      question: values.question,
      category: values.category.value,
      description: values.description,
    });
  });
  const colourStyles = {
    control: (styles) => ({ ...styles, height: "60px" }),
  };
  const errorStyel = {
    control: (styles) => ({
      ...styles,
      height: "60px",
      border: "1px solid red",
    }),
  };
  const registerOptions = {
    category: { required: "Category is not selected!" },
    question: { required: "Question is required!" },
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          <Controller
            render={({ onChange, onBlur, value, name, ref }) => (
              <textarea
                className={`${
                  errors.question
                    ? " border-red-700 border-2 "
                    : "focus:border-primery border-gray-300"
                } w-full text-lg py-4 px-4 border rounded     focus:outline-none `}
                placeholder="Type Your Question?"
                id="question"
                name={name}
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                ref={ref}
              />
            )}
            name="question"
            isClearable
            control={control}
            rules={registerOptions.question}
          />
          <p className="text-red-700 font-bold font-md">
            {errors.question && errors.question.message}
          </p>
        </div>

        <div className="mt-6">
          <Controller
            render={({ onChange, onBlur, value, name, ref }) => (
              <ReactSelect
                forwardRef={ref}
                onChange={onChange}
                onBlur={onBlur}
                name={name}
                value={value}
                instanceId="category"
                options={options}
                styles={errors.category ? errorStyel : colourStyles}
                placeholder="Select Question Category...."
              />
            )}
            name="category"
            isClearable
            control={control}
            rules={registerOptions.category}
          />
          <p className="text-red-700 font-bold font-md">
            {errors.category && errors.category.message}
          </p>
        </div>

        <div className="mt-6">
          <Controller
            render={({ onChange, onBlur, value, name, ref }) => (
              <Jodit
                inputRef={ref}
                onChange={onChange}
                onBlur={onBlur}
                name={name}
                value={value}
              />
            )}
            name="description"
            isClearable
            control={control}
            instanceId="description"
          />
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="bg-indigo-500 text-gray-100 p-4  rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                                shadow-lg"
          >
            {" Log In"}
          </button>
        </div>
      </form>
    </>
  );
};

export default QuestionForm;
