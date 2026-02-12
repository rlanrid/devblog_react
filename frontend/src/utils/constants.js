export const sortMap = {
  "최신순": (a, b) => b.id - a.id,
  "조회순": (a, b) => b.info.view - a.info.view,
  "댓글순": (a, b) => b.info.comment - a.info.comment,
};

export const tempTags = ["HTML5", "CSS", "JavaScript", "React", "Vue", "Jquery", "CS"];