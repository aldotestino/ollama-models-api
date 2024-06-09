function ModelsPage() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="container max-w-screen-lg">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className='p-4 border-b'>
            <h2 className='font-semibold text-lg'>Model {i + 1}</h2>
            <p className='text-gray-500'>This is a model description</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ModelsPage;