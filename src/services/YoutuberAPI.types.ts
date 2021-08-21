type PlayListResponseProps = {
    kind: string,
    etag: string,
    id: string,
    snippet: {
        publishedAt: Date,
        channelId: string,
        title: string,
        description: string,
        thumbnails: {
            default: {
                url: string,
                width: number,
                height: number
            },
            medium: {
                url: string,
                width: number,
                height: number
            },
            high: {
                url: string,
                width: number,
                height: number
            },
            standard: {
                url: string,
                width: number,
                height: number
            },
            maxres: {
                url: string,
                width: number,
                height: number
            }
        },
        channelTitle: string,
        localized: {
            title: string,
            description: string
        }
    }
}

type VideoProps = {
    kind: string,
    etag: string,
    id: string,
    snippet: {
      publishedAt: string,
      channelId: string,
      title: string,
      description: string,
      thumbnails: {
        default: {
          url: string,
          width: number,
          height: number
        },
        medium: {
          url: string,
          width: number,
          height: number
        },
        high: {
          url: string,
          width: number,
          height: number
        },
        standard: {
          url: string,
          width: number,
          height: number
        },
        maxres: {
          url: string,
          width: number,
          height: number
        }
      },
      channelTitle: string,
      playlistId: string,
      position: number,
      resourceId: {
        kind: string,
        videoId: string
      },
      videoOwnerChannelTitle: string,
      videoOwnerChannelId: string
    },
    contentDetails: {
      videoId: string,
      videoPublishedAt: string
    }
  }

type PlayListItemsProps = {
    kind: string,
    etag: string,
    items: VideoProps[],
    pageInfo: {
      totalResults: number,
      resultsPerPage: number
    }
  }
  

type PlaylistsResponse = {
    kind: string,
    etag: string,
    pageInfo: {
        totalResults: number,
        resultsPerPage: number
    },
    items: PlayListResponseProps[]
}



export type { PlaylistsResponse, PlayListResponseProps, VideoProps, PlayListItemsProps }