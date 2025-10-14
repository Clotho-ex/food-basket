import { CreateUserParams, SignInParams } from "@/type";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";
export const AppwriteConfig = {
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
  collectionId: process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!,
  platform: "com.clotho.fastfood",
};

// Create Appwrite Client

export const client = new Client();

client
  .setEndpoint(AppwriteConfig.endpoint)
  .setProject(AppwriteConfig.projectId)
  .setPlatform(AppwriteConfig.platform);

export const account = new Account(client);
export const database = new Databases(client);
export const avatars = new Avatars(client);

export const createUser = async ({
  email,
  password,
  name,
}: CreateUserParams) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);
    if (!newAccount) throw new Error("Failed to create user");

    await signIn({ email, password });

    const avatarURL = avatars.getInitialsURL(name);
    return await database.createDocument(
      AppwriteConfig.databaseId,
      AppwriteConfig.collectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        name,
        avatar: avatarURL,
      },
    );
  } catch (error) {
    throw new Error(error as string);
  }
};

export const signIn = async ({ email, password }: SignInParams) => {
  try {
    const session = await account.createEmailPasswordSession({
      email,
      password,
    });
    if (!session) throw new Error("Failed to sign in");
    return session;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw new Error("No user found");
    const currentUser = await database.listDocuments(
      AppwriteConfig.databaseId,
      AppwriteConfig.collectionId,
      [Query.equal("accountId", currentAccount.$id)],
    );
    if (!currentUser) throw new Error("No user found");
    return currentUser.documents[0];
  } catch (error) {
    console.error("Get current user error:", error);
    throw new Error(error as string);
  }
};
export const signOut = async () => {
  try {
    await account.deleteSession("current");
    return true;
  } catch (error) {
    console.error("Sign out error:", error);
    throw new Error(error as string);
  }
};
