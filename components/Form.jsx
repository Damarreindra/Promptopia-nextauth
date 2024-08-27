import Link from "next/link";
import React from "react";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full maw-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI Platform
      </p>

      <form
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
        onSubmit={handleSubmit}
      >
        <label htmlFor="">
          <span className="font-satoshi font-semibold text-bold text-gray-700">
            Your AI Prompt
          </span>
        </label>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          value={post.prompt}
          onChange={(e) => setPost({ ...post, prompt: e.target.value })}
          placeholder="Write your prompt here ...."
          required
          className="form_textarea"
        ></textarea>

<label htmlFor="">
          <span className="font-satoshi font-semibold text-bold text-gray-700">
            Tag
          </span>
        </label>
        <input
          name=""
          id=""
          cols="30"
          rows="10"
          value={post.tag}
          onChange={(e) => setPost({ ...post, tag: e.target.value })}
          placeholder="Tag here ...."
          required
          className="form_input"
        ></input>

        <div className="flex-end mx-3 mb-5 gap-4">
            <Link href={'/'} className="text-gray-400 text-sm">
            Cancel
            </Link>
            <button type="submit" className="px-5 py-1.5 text-sm font-bold bg-orange-500 rounded-full text-white"
            disabled={submitting}
            >
                {
                    submitting ? `${type}...` :type
                }

            </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
