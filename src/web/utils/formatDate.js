const formatDate = (date) =>
  new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "short",
  }).format(date)

export default formatDate
