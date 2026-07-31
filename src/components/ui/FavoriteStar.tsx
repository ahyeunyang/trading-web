type FavoriteStarProps = {
  active: boolean;
};

export function FavoriteStar({ active }: FavoriteStarProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="m12 2.9 2.78 5.63 6.22.91-4.5 4.38 1.06 6.19L12 17.08 6.44 20l1.06-6.18L3 9.44l6.22-.91L12 2.9Z"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
