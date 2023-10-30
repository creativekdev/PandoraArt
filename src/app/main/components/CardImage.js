import Card from '@material-ui/core/Card';

export default function CardImage(prop) {
  return (
    <>
      <Card className="w-full rounded-20 shadow mb-16">
        <img
          src={prop.url}
          className="w-full block"
          alt="note"
        />
      </Card>
    </>
  );
}
