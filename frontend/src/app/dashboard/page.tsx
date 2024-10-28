import Table from '../ui/dashboard/table';

export default function Dashboard() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Dashboard</h1>
      </div>
      <Table />
    </div>
  );
}
