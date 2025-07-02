
const AccountOverview = () => {
  return (
    <main className="flex-1 px-6 md:mt-28 max-w-[1000px]">

      {/* Recent purchases */}
      <section>
        <h2 className="text-xl font-medium mb-8">RECENT PURCHASES</h2>
        <div className="bg-[#f7f3ed] p-12 text-center flex flex-col gap-3">
          <p className="text-xl font-medium">0 Recent orders</p>
          <p className="text-sm mt-1 text-nowrap">You haven't placed any orders yet</p>
          <a
            href="#"
            className="underline underline-offset-4 font-bold text-sm mt-2 inline-block"
          >
            Continue shopping
          </a>
        </div>
      </section>

     
    </main>
  );
};
export default AccountOverview;
