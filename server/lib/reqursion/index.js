function reqursion( arr, id ) {
  for ( let a = 0; a < arr.length; a++) {
    if ( arr[a].id === id) {
      return arr[a];
    } else if (arr[a].comments.length > 0) {
      const val = reqursion(arr[a].comments, id);
      if (val) {
        return val;
      }
    }
  }
  return null;
}

module.exports = {
  reqursion,
}