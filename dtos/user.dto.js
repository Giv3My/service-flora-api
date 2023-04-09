export class UserDto {
  constructor(model) {
    this.id = model._id;
    this.email = model.email;
    this.role = model.role;
  }
}

export class AdminDto extends UserDto {
  constructor(model) {
    super(model);

    this.cities = model.cities;
  }
}

export class CustomerDto extends UserDto {
  constructor(model) {
    super(model);

    this.first_name = model.first_name;
    this.last_name = model.last_name;
    this.owner_phone = model.owner_phone;
  }
}
