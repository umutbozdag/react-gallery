export default function convertDate(createdAt) {
  return new Date(createdAt).toUTCString();
}
