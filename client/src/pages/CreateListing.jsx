import SectionTitle from "../components/shared/SectionTitle";

const CreateListing = () => {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <SectionTitle title="Create a Listing" />
      <form className="flex flex-col sm:flex-row">
        <div className="flex flex-col gap-5 flex-1">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            maxLength={60}
            minLength={10}
            required
            className="border rounded-md p-2 focus:outline-none"
          />

          <textarea
            type="text"
            name="name"
            id="name"
            placeholder="Description"
            required
            className="border rounded-md p-2 focus:outline-none"
          />

          <input
            type="text"
            name="name"
            id="name"
            placeholder="Address"
            required
            className="border rounded-md p-2 focus:outline-none"
          />
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
