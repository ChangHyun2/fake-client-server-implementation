import React, { useEffect } from "react";
import { usePostCard, useGetCards } from "../../fetchAPI/cards";
import { Former, useForm, useField } from "../../lib/Former";
import styled from "styled-components";

const StyledPostCard = styled.div`
  width: 200px;

  & * {
    width: 100%;
    box-sizing: border-box;
  }

  label {
    font-weight: bold;
  }

  input {
    margin-bottom: 10px;
  }

  button {
    color: #fff;
    background-color: #111;
    border: none;
    padding: 4px;
    cursor: pointer;

    &[disabled] {
      background-color: #777;
    }
  }
`;

const StyledForm = styled.form`
  position: relative;

  & > div {
    border: 1px solid red;
    position: absolute;
    top: 100%;

    opacity: 0;
    &[data-show="true"] {
      opacity: 1;
    }
  }
`;

const Form = (props) => {
  const { handleSubmit } = useForm();
  const [error, setError] = React.useState(null);
  const [showToast, setShowToast] = React.useState(null);
  const timeStamp = React.useRef(null);

  const validateAndSubmit = async (e) => {
    setShowToast(false);
    clearTimeout(timeStamp.current);

    try {
      await handleSubmit(e);
    } catch (err) {
      setError(err);
      setShowToast(true);
      timeStamp.current = setTimeout(() => setShowToast(false), 2000);
    }
  };

  return (
    <StyledForm onSubmit={validateAndSubmit}>
      {
        <div data-show={showToast ? true : false}>
          {error ? JSON.stringify(error, null, 4) : null}
        </div>
      }
      {props.children}
    </StyledForm>
  );
};

const Input = ({ type, name }) => {
  const { value, setValue } = useField(name);

  return (
    <>
      <label htmlFor={name}>{name}</label>
      <input
        id={name}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </>
  );
};

export default function PostCard() {
  const postCard = usePostCard();
  const getCards = useGetCards();

  const handleSubmit = async (values) => {
    try {
      await postCard.fetchData(values);
      await getCards.fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <StyledPostCard>
      <Former
        initialValues={{ title: "", content: "" }}
        handleSubmit={handleSubmit}
        validate={{
          title: (value) => {
            const errors = [];
            if (typeof value !== "string") {
              errors.push("title must be string");
            }
            if (value.length <= 4) {
              errors.push("title length should be longer than 4");
            }
            return errors;
          },
          content: (value) => {
            const errors = [];
            if (typeof value !== "string") {
              errors.push("title must be string");
            }
            if (value.length <= 4) {
              errors.push("title length should be longer than 8");
            }
            return errors;
          }
        }}
      >
        <Form>
          <Input type="text" name="title" />
          <Input type="text" name="content" />
          <button
            disabled={postCard.isLoading}
            style={postCard.error ? { border: "red 1px" } : null}
          >
            add card
          </button>
        </Form>
      </Former>
    </StyledPostCard>
  );
}
