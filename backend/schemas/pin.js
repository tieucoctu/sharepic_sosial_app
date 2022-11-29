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
      name: "categories",
      title: "Categories",
      type: "array",
      of: [
        {
          name: "categories",
          title: "Categories",
          type: "document",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "value", type: "string", title: "Value" },
          ],
        },
      ],
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
          name: "save",
          title: "Save",
          type: "document",
          fields: [
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
    },
    {
      name: "comments",
      title: "Comments",
      type: "array",
      of: [
        {
          name: "comment",
          title: "Comment",
          type: "document",
          fields: [
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
            {
              name: "key",
              title: "Key",
              type: "string",
            },
          ],
        },
      ],
    },
    {
      name: "like",
      title: "Like",
      type: "array",
      of: [
        {
          name: "like",
          title: "Like",
          type: "document",
          fields: [
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
    },
  ],
};
