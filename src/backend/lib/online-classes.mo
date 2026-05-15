import Types "../types/common";
import OcTypes "../types/online-classes";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  // Add a new class video for a provider.
  // Returns the created ClassVideo.
  public func addClassVideo(
    videos : List.List<OcTypes.ClassVideo>,
    nextId : Nat,
    providerId : Types.ProviderId,
    input : OcTypes.ClassVideoInput
  ) : OcTypes.ClassVideo {
    let video : OcTypes.ClassVideo = {
      id = nextId;
      providerId = providerId;
      title = input.title;
      description = input.description;
      subCategory = input.subCategory;
      fileKey = input.fileKey;
      uploadedAt = Time.now();
      isActive = true;
    };
    videos.add(video);
    video;
  };

  // Get all videos for a given provider (active + inactive).
  public func getClassVideosByProvider(
    videos : List.List<OcTypes.ClassVideo>,
    providerId : Types.ProviderId
  ) : [OcTypes.ClassVideo] {
    videos.filter(func(v) { v.providerId == providerId }).toArray();
  };

  // Get all active videos for a given provider (public listing).
  public func getActiveClassVideosByProvider(
    videos : List.List<OcTypes.ClassVideo>,
    providerId : Types.ProviderId
  ) : [OcTypes.ClassVideo] {
    videos.filter(func(v) { v.providerId == providerId and v.isActive }).toArray();
  };

  // Get all active videos for a given sub-category (public browse).
  public func getActiveClassVideosBySubCategory(
    videos : List.List<OcTypes.ClassVideo>,
    subCategory : OcTypes.ClassSubCategory
  ) : [OcTypes.ClassVideo] {
    videos.filter(func(v) { v.subCategory == subCategory and v.isActive }).toArray();
  };

  // Delete a video by id; caller must own it (providerId check).
  // Returns true if deleted, false if not found or caller mismatch.
  public func deleteClassVideo(
    videos : List.List<OcTypes.ClassVideo>,
    videoId : Nat,
    providerId : Types.ProviderId
  ) : Bool {
    let before = videos.size();
    let filtered = videos.filter(func(v) {
      not (v.id == videoId and v.providerId == providerId)
    });
    videos.clear();
    videos.append(filtered);
    videos.size() < before;
  };

  // Toggle isActive flag on a video; caller must own it.
  // Returns the updated ClassVideo, or null if not found / caller mismatch.
  public func toggleClassVideoActive(
    videos : List.List<OcTypes.ClassVideo>,
    videoId : Nat,
    providerId : Types.ProviderId
  ) : ?OcTypes.ClassVideo {
    var result : ?OcTypes.ClassVideo = null;
    videos.mapInPlace(func(v) {
      if (v.id == videoId and v.providerId == providerId) {
        let updated = { v with isActive = not v.isActive };
        result := ?updated;
        updated;
      } else { v };
    });
    result;
  };

  // Get a single video by id.
  public func getClassVideoById(
    videos : List.List<OcTypes.ClassVideo>,
    videoId : Nat
  ) : ?OcTypes.ClassVideo {
    videos.find(func(v) { v.id == videoId });
  };
};
