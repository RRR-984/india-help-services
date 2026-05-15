import Types "../types/common";
import OcTypes "../types/online-classes";
import OcLib "../lib/online-classes";
import List "mo:core/List";

mixin (
  videos : List.List<OcTypes.ClassVideo>,
  nextVideoId : { var value : Nat }
) {

  // ── Provider: upload a new class video ───────────────────────────────────
  // fileKey comes from object-storage upload.
  public shared func addClassVideo(
    providerId : Types.ProviderId,
    input : OcTypes.ClassVideoInput
  ) : async OcTypes.ClassVideo {
    let video = OcLib.addClassVideo(videos, nextVideoId.value, providerId, input);
    nextVideoId.value += 1;
    video;
  };

  // ── Provider: list own videos (active + inactive) ─────────────────────────
  public query func getMyClassVideos(
    providerId : Types.ProviderId
  ) : async [OcTypes.ClassVideo] {
    OcLib.getClassVideosByProvider(videos, providerId);
  };

  // ── Provider: delete a video ──────────────────────────────────────────────
  public shared func deleteClassVideo(
    videoId : Nat,
    providerId : Types.ProviderId
  ) : async Bool {
    OcLib.deleteClassVideo(videos, videoId, providerId);
  };

  // ── Provider: toggle video active/inactive ────────────────────────────────
  public shared func toggleClassVideoActive(
    videoId : Nat,
    providerId : Types.ProviderId
  ) : async ?OcTypes.ClassVideo {
    OcLib.toggleClassVideoActive(videos, videoId, providerId);
  };

  // ── Public: browse active videos by provider ─────────────────────────────
  public query func getClassVideosByProvider(
    providerId : Types.ProviderId
  ) : async [OcTypes.ClassVideo] {
    OcLib.getActiveClassVideosByProvider(videos, providerId);
  };

  // ── Public: browse active videos by sub-category ─────────────────────────
  public query func getClassVideosBySubCategory(
    subCategory : OcTypes.ClassSubCategory
  ) : async [OcTypes.ClassVideo] {
    OcLib.getActiveClassVideosBySubCategory(videos, subCategory);
  };

  // ── Public: get a single video by id ─────────────────────────────────────
  public query func getClassVideoById(videoId : Nat) : async ?OcTypes.ClassVideo {
    OcLib.getClassVideoById(videos, videoId);
  };
};
