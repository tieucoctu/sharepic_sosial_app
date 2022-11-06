export const categories = [
  {
    value: "cars",
    label: "Ô tô",
  },

  {
    value: "fitness",
    label: "Thể hình",
  },
  {
    value: "wallpaper",
    label: "Hình nền",
  },
  {
    value: "websites",
    label: "Websites",
  },
  {
    value: "photo",
    label: "Ảnh",
  },
  {
    value: "food",
    label: "Đồ ăn",
  },
  {
    value: "nature",
    label: "Thiên nhiên",
  },
  {
    value: "art",
    label: "Tranh vẽ",
  },
  {
    value: "travel",
    label: "Du lịch",
  },
  {
    value: "quotes",
    label: "Dấu ngoặc kép",
  },
  {
    value: "cats",
    label: "Mèo",
  },
  {
    value: "dogs",
    label: "Chó",
  },
  {
    value: "flowers",
    label: "Hoa",
  },
  {
    value: "women",
    label: "Phụ nữ",
  },
  {
    value: "man",
    label: "Đàn ông",
  },
  {
    value: "cartoons",
    label: "Hoạt hình",
  },
  {
    value: "city",
    label: "Thành phố",
  },
  {
    value: "love",
    label: "Tình yêu",
  },
  {
    value: "others",
    label: "Khác",
  },
];

export const feedQuery = `*[_type == "pin"] | order(_createdAt desc) {
  image{
    asset->{
      url
    }
  },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      },
    } `;

export const pinDetailQuery = (pinId) => {
  const query = `*[_type == "pin" && _id == '${pinId}']{
    image{
      asset->{
        url
      }
    },
    _id,
    title, 
    about,
    category,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
   save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    }
  }`;
  return query;
};

export const pinDetailMorePinQuery = (pin) => {
  const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const searchQuery = (searchTerm) => {
  const query = `*[_type == "pin" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
        image{
          asset->{
            url
          }
        },
            _id,
            destination,
            postedBy->{
              _id,
              userName,
              image
            },
            save[]{
              _key,
              postedBy->{
                _id,
                userName,
                image
              },
            },
          }`;
  return query;
};

export const userQuery = (userId) => {
  const query = `*[_type == "user" && _id == '${userId}']`;
  return query;
};

export const userCreatedPinsQuery = (userId) => {
  const query = `*[ _type == 'pin' && userId == '${userId}'] | order(_createdAt desc){
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const userSavedPinsQuery = (userId) => {
  const query = `*[ _type == 'pin' && userId == '${userId}' in save[].userId   ] | order(_createdAt desc) {
   image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};
