import AppError from "@shared/errors/AppError";

import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import UpdateProfileService from "./UpdateProfileService";

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe("UpdateProfile", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it("should be able to update the informations", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: "David Mills",
      email: "david.mills@example.com",
    });

    expect(updatedUser.name).toBe("David Mills");
    expect(updatedUser.email).toBe("david.mills@example.com");
  });

  it("should not be able to update the email to another existent user email", async () => {
    await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    const user = await fakeUsersRepository.create({
      name: "Test",
      email: "test@example.com",
      password: "123456",
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: "David Mills",
        email: "johndoe@example.com",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to update the password", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: "David Mills",
      email: "david.mills@example.com",
      old_password: "123456",
      password: "123123",
    });

    expect(updatedUser.password).toBe("123123");
  });

  it("should not be able to update the password without the old one", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: "David Mills",
        email: "david.mills@example.com",
        password: "123123",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to update the password with wrong old password", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: "David Mills",
        email: "david.mills@example.com",
        old_password: "wrong old password",
        password: "123123",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to update unexistent user profile", async () => {
    await expect(
      updateProfile.execute({
        user_id: "non existing user id",
        name: "David Mills",
        email: "david.mills@example.com",
        old_password: "wrong old password",
        password: "123123",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
