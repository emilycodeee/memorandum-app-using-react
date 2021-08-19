import Item from "./Item";

const List = ({ data, deleteData, submittingStatus }) => {
  console.log(data);
  return (
    <div className="list">
      {data.map((item) => {
        const { date, note, time, id } = item;
        return (
          <Item
            id={id}
            date={date}
            note={note}
            time={time}
            deleteData={deleteData}
            key={id}
            submittingStatus={submittingStatus}
          />
        );
      })}
    </div>
  );
};

export default List;
