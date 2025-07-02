
const MyPurchases = () => {
  return (
    <main className="flex-1 p-6 md:mt-28">
      {/* Recent purchases */}
      <section className="mb-10">
        <h2 className="text-xl font-medium mb-4">MY PURCHASES</h2>
        <div className="bg-[#f7f3ed] p-12 text-center rounded flex flex-col gap-3">
          <p className="text-xl font-medium">0 Recent orders</p>
          <p className="text-sm mt-1">You haven't placed any orders yet</p>
          <a
            href="#"
            className="underline underline-offset-4 font-bold text-sm mt-2 inline-block"
          >
            Continue shopping
          </a>
        </div>
      </section>

      {/* Address book */}
      <section>
        <h2 className="text-xl font-medium mb-7">ADDRESS BOOK</h2>
        <p className="text-sm font-medium">
          You currently have no saved addresses
        </p>
      </section>
    </main>
  );
};
export default MyPurchases;
