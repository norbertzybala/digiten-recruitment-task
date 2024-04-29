import "./Error.css";
export default function Error({ title, message }) {
  return (
    <div className="error_message_component">
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}
