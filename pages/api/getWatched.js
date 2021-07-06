import db from '../../firebase';

export default async (req, res) => {
  let watchedList = [];

  console.log(req.body.email);
  await db
    .collection(`users/${req.body.email}/watched`)
    .orderBy('timeStamp', 'desc')
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        watchedList.push({ id: doc.id, data: doc.data() });
      });
    });
  return res.status(200).json({ watched: watchedList });
};
