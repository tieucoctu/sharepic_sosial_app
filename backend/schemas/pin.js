export default {
  name: "pin",
  title: "Pin",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "about",
      title: "About",
      type: "string",
    },
    {
      name: "destination",
      title: "Destination",
      type: "url",
    },
    {
      name: "category",
      title: "Category",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "userId",
      title: "UserId",
      type: "string",
    },
    {
      name: "postedBy",
      title: "PostedBy",
      type: "postedBy",
    },
    {
      name: "save",
      title: "Save",
      type: "array",
      of: [
        {
          name: "postedBy",
          title: "PostedBy",
          type: "postedBy",
        },
        {
          name: "userId",
          title: "UserId",
          type: "string",
        },
      ],
    },
    {
      name: "comments",
      title: "Comments",
      type: "array",
      of: [
        {
          name: "postedBy",
          title: "PostedBy",
          type: "postedBy",
        },
        {
          name: "comment",
          title: "Comment",
          type: "string",
        },
      ],
    },
    {
      name: "like",
      title: "Like",
      type: "array",
      of: [
        {
          name: "postedBy",
          title: "PostedBy",
          type: "postedBy",
        },
        {
          name: "userId",
          title: "UserId",
          type: "string",
        },
      ],
    },
  ],
};
