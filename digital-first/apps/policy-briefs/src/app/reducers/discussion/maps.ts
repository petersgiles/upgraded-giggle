export const mapAuthor = (author): any => ({
  username: author.Title,
  name: author.Title,
  email: author.Email,
  phone: author.Phone,
  color: 'rgb(84, 70, 126)'
})

export const mapDiscussion = (item): any => ({
  id: `${item.ID}`,
  sortOrder: item.SortOrder,
  briefId: `${item.Brief.ID}`,
  parent: item.Parent,
  text: `${item.Comments}`,
  created: `${item.Created}`,
  author: mapAuthor(item.Author)
})

export const mapDiscussions = (items): any[] => (items || []).map(mapDiscussion)
