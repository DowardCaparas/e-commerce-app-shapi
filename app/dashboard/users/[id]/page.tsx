import React from "react";

const UserPage = async (props: {
  params: Promise<{
    id: number;
  }>;
}) => {
  const params = await props.params;
  const id = params.id;

  return (
    <div className="">
        {id}
    </div>
  );
};

export default UserPage;
