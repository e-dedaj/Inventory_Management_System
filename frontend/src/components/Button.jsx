export default function Button({ children, variant = 'submit', ...props }) {
  const variantClass = 
    variant === 'edit' ? 'btn-action-edit' :
    variant === 'delete' ? 'btn-action-delete' : 
    'btn-submit';

  return (
    <button className={variantClass} {...props}>
      {children}
    </button>
  );
}