
interface CardProp {
  height?: string;
  width?: string;
  children: any;
}
const Card = (Props: CardProp) => {
  return (
    <div className="min-h-80 max-h-[620px] w-64 max-w-lg p-1">
      <div className="block h-full w-full overflow-hidden rounded-lg bg-white shadow-md hover:shadow-xl">
        {Props.children}
      </div>
    </div>
  );
};
export default Card;
