import './Card.css';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children, className, ...rest }) => {
  return (
    <div className={`card ${className || ''}`} {...rest}>
      {children}
    </div>
  );
};

export default Card;