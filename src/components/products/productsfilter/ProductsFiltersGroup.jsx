import Filter from "./Filter";
import Slider from "./Slider";
import Sort from "./Sort";

const ProductsFiltersGroup = ({
  filters,
  setFilters,
  sizeType,
  selectedSort,
  setSelectedSort,
}) => {
  return (
    <div className="flex flex-nowrap items-center justify-between gap-4 my-3">
      <div className="flex flex-wrap items-center gap-1">
        <Filter
          filterName="Color"
          options={[
            { label: "Black", count: 23 },
            { label: "White", count: 29 },
            { label: "Gray", count: 41 },
            { label: "Blue", count: 43 },
            { label: "Beige", count: 39 },
            { label: "Green", count: 37 },
            { label: "Red", count: 37 },
            { label: "Yellow", count: 37 },
          ]}
          filters={filters}
          setFilters={setFilters}
        />
        <Filter
          filterName="Size"
          options={
            (sizeType == "alpha" && [
              { label: "XXS", count: 23 },
              { label: "XS", count: 29 },
              { label: "S", count: 41 },
              { label: "M", count: 43 },
              { label: "L", count: 39 },
              { label: "XL", count: 37 },
            ]) ||
            (sizeType == "numbered" && [
              { label: "26", count: 23 },
              { label: "28", count: 29 },
              { label: "30", count: 41 },
              { label: "32", count: 43 },
              { label: "34", count: 39 },
              { label: "36", count: 37 },
            ]) ||
            (sizeType == "shoe" && [
              { label: "6", count: 23 },
              { label: "7", count: 29 },
              { label: "8", count: 41 },
              { label: "9", count: 43 },
              { label: "10", count: 39 },
              { label: "11", count: 37 },
              { label: "12", count: 37 },
            ])
          }
          filters={filters}
          setFilters={setFilters}
        />
        <Slider filterName="Price" setFilters={setFilters} />
      </div>

      <Sort
        options={["Latest", "Price - low to high", "Price - high to low"]}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
      />
    </div>
  );
};

export default ProductsFiltersGroup;
