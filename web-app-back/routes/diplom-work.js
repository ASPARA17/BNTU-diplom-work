
const ALL_DIPLOM_WORK = `SELECT name, id_status, id_student, id_leader, mark FROM diplom_work`

app.get('/diplom-work/all', async (req, res) => {
  try {
    const diplomWork = await pool.query(ALL_DIPLOM_WORK);
    res.json(diplomWork.rows)
  } catch (error) {
    console.log(error.message)
  }
});