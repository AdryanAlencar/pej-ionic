import { PlayListItemsProps, PlaylistsResponse } from "./YoutuberAPI.types";

const API_URL = "https://www.googleapis.com/youtube/v3";
const DOWNLOAD_API_URL = "http://db1.amemais.tech:5000";
const MP3_PATH = "http://db1.amemais.tech/video/";
const YOUTUBE_WATCH = "https://www.youtube.com/watch?v=";
const API_KEY = "AIzaSyAf5B2FmQLge0x5dmQKu_TDJTdLMkLRXsU";
const CHANNELID = "UC5rPJCLSIL-1LkbxlDrmYqQ";


async function getPlayLists(){
    const request = await fetch(`${API_URL}/playlists?part=snippet&channelId=${CHANNELID}&key=${API_KEY}`);
    const response = await request.json();

    return response as PlaylistsResponse;
}

async function getVideos(playlistId:string) {
    const request = await fetch(`${API_URL}/playlistItems?part=id&part=snippet&part=contentDetails&playlistId=${playlistId}&key=${API_KEY}`);
    const response = await request.json();

    return response as PlayListItemsProps;
}

async function getMp3(video_id: string){
    const link = `${YOUTUBE_WATCH}${video_id}`;
    const body =  `video_id=${video_id}&video_format=mp3`;
    const request = await fetch(`${DOWNLOAD_API_URL}/download`, {
        method: "POST",
        headers:{
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body
    })

    const response = await request.json();

    return response
}

export { getPlayLists, getVideos, getMp3 }