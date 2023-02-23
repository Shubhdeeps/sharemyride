export const TimelineTag = ({ data }: { data: string }) => {
  return (
    <span className="p-2 text-center primary-bg border-r3 fontLight timeline-tag">
      {data}
    </span>
  );
};
