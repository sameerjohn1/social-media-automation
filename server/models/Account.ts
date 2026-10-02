import mongoose from "mongoose";

export const accountPlatforms = [
    "twitter",
    "linkedin",
    "facebook",
    "instagram",
    "facebook_page",
    "linkedin_page",
    "instagram_business",
] as const;

export type AccountPlatform = (typeof accountPlatforms)[number];

interface AccountDocument {
    user: mongoose.Types.ObjectId;
    platform: AccountPlatform;
    handle: string;
    zernioAccountId?: string;
    accessToken?: string;
    refreshToken?: string;
    tokenExpiresAt?: Date;
    status: "connected" | "disconnected";
    avatarUrl?: string;
}

const accountSchema=new mongoose.Schema<AccountDocument>({
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    platform:{type:String,enum:accountPlatforms,required:true},
    handle:{type:String,required:true},
    zernioAccountId:{type:String},
    accessToken:{type:String},
    refreshToken:{type:String},
    tokenExpiresAt:{type:Date},
    status:{type:String,enum:["connected","disconnected"],default:"connected"},
    avatarUrl:{type:String}
},{timestamps:true})

export const Account=mongoose.model<AccountDocument>("Account",accountSchema)

