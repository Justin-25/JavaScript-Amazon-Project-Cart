class Car {
  #brand;
  #model;
  #speed;
  isTrunkOpen;

  constructor(carModel) {
    this.#brand = carModel.brand;
    this.#model = carModel.model;
    this.#speed =  0;
    this.isTrunkOpen = false;
  }

  displayInfo() {
    console.log(`${this.#brand} ${this.#model} Speed: ${this.#speed} km/h. Trunk: ${this.isTrunkOpen}`);
  }

  openTrunk() {
    if (this.#speed === 0) {
      this.isTrunkOpen = true
    }
  }
  
  closeTrunk() {
    this.isTrunkOpen = false
  }

  go() {
    if (this.isTrunkOpen === true) {
      return
    } else if (this.isTrunkOpen === false) {
      this.#speed = Math.min(this.#speed + 5, 200);
    }
  }

  break() {
    this.#speed = Math.max(this.#speed - 5, 0);
  }
}

class RaceCar extends Car{
  acceleration

  constructor(carModel) {
    super(carModel);
    this.acceleration = carModel.acceleration;
  }

  displayInfo() {
    console.log(`${this.brand} ${this.model} Speed: ${this.acceleration} km/h.`);
  }

  go() {
    this.speed = Math.min(this.speed + this.acceleration, 300)
  }

  openTrunk() {
    return
  }
  
  closeTrunk() {
    return
  }
}

const raceCar = new RaceCar({
  brand: 'Ferrari',
  model: 'F1',
  acceleration: 180
})

const car = new Car({
  brand: 'Ferrari',
  model: 'F40',
});
car.go();
car.displayInfo()
raceCar.displayInfo()

/*
const car = new Car({
  brand: 'Ferrari',
  model: 'F40',
});
car.go();
car.go();
car.go();
car.go();
car.go();
car.go();
car.go();
car.go();
car.closeTrunk();
car.displayInfo();
car.break();
car.break();
car.break();
car.break();
car.break();
car.break();
car.break();
car.break();
car.openTrunk();
car.displayInfo();


const car1 = new Car({
  brand: 'Toyota',
  model: 'Corolla'
});

const car2 = new Car({
  brand: 'Tesla',
  model: 'Model 3'
});
*/