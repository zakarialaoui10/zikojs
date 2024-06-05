const isPalindrome=(str)=>{
    str=str.toLocaleLowerCase();
    let l=str.length,i;
    for(i=0;i<l/2;i++)if(str[i]!=str[l-i-1])return false;
    return true;
}
const isAnagrams=(word,words)=>{
    word=word.split("").sort();
    words=words.split("").sort();
    return JSON.stringify(word)===JSON.stringify(words);
}
const isIsogram=(str)=>{
   return [...new Set(str.toLowerCase())].length===str.length;
}
export{
    isPalindrome,
    isAnagrams,
    isIsogram
}