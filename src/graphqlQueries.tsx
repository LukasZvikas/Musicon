import gql from "graphql-tag";

export const GET_TRACKS_QUERY = gql`
  query TracksQuery($selectedGenres: [String!]!) {
    suggestedTracks(selectedGenres: $selectedGenres) {
      id
      name
      artists {
        name
      }
      preview_url
      album {
        images {
          url
        }
      }
    }
  }
`;

export const SAVED_TRACKS_QUERY = gql`
  query SavedTracks($savedTracks: [String!]!) {
    savedTracks(savedTracks: $savedTracks) {
      id
      name
      artists {
        name
      }
      preview_url
      album {
        images {
          url
        }
      }
    }
  }
`;

export const USER_PLAYLISTS_QUERY = gql`
  query userPlaylists($username: String!) {
    userPlaylists(username: $username) {
      id
      name
    }
  }
`;

export const USER_DETAILS_QUERY = gql`
  query userDetails {
    userDetails {
      display_name
    }
  }
`;

export const ADD_TO_PLAYLIST_QUERY = gql`
  query addToPlaylist($songIds: [String!]!, $playlist_id: String!) {
    addToPlaylist(songIds: $songIds, playlist_id: $playlist_id) {
      snapshot_id
    }
  }
`;
