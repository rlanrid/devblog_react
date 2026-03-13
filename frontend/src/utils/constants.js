export const sortMap = {
  "최신순": (a, b) => b.id - a.id,
  "조회순": (a, b) => b.info.views - a.info.views,
  "댓글순": (a, b) => b.info.comment - a.info.comment,
};

export const tempTags = ["HTML5", "CSS", "JavaScript", "React", "Vue", "Jquery", "CS"];