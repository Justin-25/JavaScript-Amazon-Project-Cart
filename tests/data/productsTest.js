import { Product, Clothing, Appliances } from "../../data/products.js";
import { formatCurrency } from "../../scripts/utils/money.js";

describe('test suite: Product', () => {
  let productDetails;
  beforeEach(() => {
    productDetails = {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87
      },
      priceCents: 1090
    }
  });
  
  it('check if the properties are correct', () => {
    const product = new Product(productDetails);

    expect(product.id).toEqual(productDetails.id);
    expect(product.image).toEqual(productDetails.image);
    expect(product.name).toEqual(productDetails.name);
    expect(product.rating).toEqual(productDetails.rating);
    expect(product.priceCents).toEqual(productDetails.priceCents);
  });

  it('check if the method are correct', () => {
    const product = new Product(productDetails);

    expect(product.getStarUrl()).toEqual(`images/ratings/rating-${productDetails.rating.stars * 10}.png`);
    expect(product.getPrice()).toEqual(`$${formatCurrency(productDetails.priceCents)}`);
    expect(product.extraInfoHTML()).toEqual('');
  });
})

describe('test suite: Clothing', () => {
  let productDetails;
  beforeEach(() => {
    productDetails = {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87
      },
      priceCents: 1090,
      sizeChartLink: "images/clothing-size-chart.png"
    }
  });

  it('check if the properties and methods are correct', () => {
    const clothing = new Clothing(productDetails);

    expect(clothing.id).toEqual(productDetails.id);
    expect(clothing.image).toEqual(productDetails.image);
    expect(clothing.name).toEqual(productDetails.name);
    expect(clothing.rating).toEqual(productDetails.rating);
    expect(clothing.priceCents).toEqual(productDetails.priceCents);
    expect(clothing.sizeChartLink).toEqual(productDetails.sizeChartLink);
  })

  it('check if the method are correct', () => {
    const clothing = new Clothing(productDetails);

    expect(clothing.getStarUrl()).toEqual(`images/ratings/rating-${productDetails.rating.stars * 10}.png`);
    expect(clothing.getPrice()).toEqual(`$${formatCurrency(productDetails.priceCents)}`);
    expect(clothing.extraInfoHTML()).toEqual(`
      <a href="${productDetails.sizeChartLink}" target="_blank">
        Size chart
      </a>
    `);
  });
})

describe('test suite: Appliances', () => {
  let productDetails;
  beforeEach(() => {
    productDetails = {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87
      },
      priceCents: 1090,
      instructionsLink: "images/appliance-instructions.png",
      warrantyLink: "images/appliance-warranty.png"

    }
  });

  it('check if the properties and methods are correct', () => {
    const appliance = new Appliances(productDetails);

    expect(appliance.id).toEqual(productDetails.id);
    expect(appliance.image).toEqual(productDetails.image);
    expect(appliance.name).toEqual(productDetails.name);
    expect(appliance.rating).toEqual(productDetails.rating);
    expect(appliance.priceCents).toEqual(productDetails.priceCents);
    expect(appliance.instructionsLink).toEqual(productDetails.instructionsLink);
    expect(appliance.warrantyLink).toEqual(productDetails.warrantyLink);
  });

  it('check if the method are correct', () => {
    const appliance = new Appliances(productDetails);

    expect(appliance.getStarUrl()).toEqual(`images/ratings/rating-${productDetails.rating.stars * 10}.png`);
    expect(appliance.getPrice()).toEqual(`$${formatCurrency(productDetails.priceCents)}`);
    expect(appliance.extraInfoHTML()).toEqual(`
      <a href="${productDetails.instructionsLink}" target="_blank">
        Instructions
      </a>
      <a href="${productDetails.warrantyLink}" target="_blank">
        Warranty
      </a>
    `);
  });
})