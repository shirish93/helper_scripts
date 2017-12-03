

The Terminator Trick With Solidity Strings


In the course of programming in Solidity, you will want to interact with strings early on. After all, strings are the most interesting data types to interact with, and the most helpful, when you want to debug your programs.

As a programmer, you likely know how strings work already. Sure, solidity is more C-like in that it doesn't have the nice javascript/python string functions like length, concatenation, etcetera, but it's just about that, right? Nothing unexpected? We will see C !

First, lets go through the official documentation, and see what it has to say on strings. The available documentation on strings is relatively limited. On the page for data types in Solidity, under the sub-heading of 'Dynamically-sized byte arrays', the documentation says the following:

http://solidity.readthedocs.io/en/develop/types.html

`
#### Dynamically-sized byte array
string:
    Dynamically-sized UTF-8-encoded string, see Arrays. Not a value-type!

As a rule of thumb, use bytes for arbitrary-length raw byte data and string for arbitrary-length string (UTF-8) data.

`

Okay. What do we know from this? That strings are dynamic byte arrays, and it's (probably) not a good idea to store raw bytes in there. But of course, we're experienced programmers, why would we ever store raw bytes as strings anyway right?

Maybe we missed out some interesting behavior of arrays though? Since strings are also arrays, we should look into the documentation for arrays.

http://solidity.readthedocs.io/en/develop/types.html#arrays

`
Arrays can have a compile-time fixed size or they can be dynamic. For storage arrays, the element type can be arbitrary (i.e. also other arrays, mappings or structs). For memory arrays, it cannot be a mapping and has to be an ABI type if it is an argument of a publicly-visible function.
`

Nothing off or unexpected there. So let's see if we can do something unexpected here. A spoiler alert of sorts for C programmers: we will be testing how solidity handles string termination.

First, lets construct an interesting 








`
let code_arr = [ 65, 80, 80, 0, 76, 69 ]
`

code_arr.map(x=>String.fromCodePoint(x))
let str_arr = [ "A", "P", "P", "\u0000", "L", "E" ]
console.log(str_arr.join(''))

https://news.ycombinator.com/item?id=3906755


https://news.ycombinator.com/item?id=13973174



Solidity documentation claims that a 'string' is just an array of bytes. Interestingly, it can also be treated as 'regular' strings by programmers without being caught by the the compiler.

People who actually know solidity know that they are not real strings, and have created libraries such as this to help out. However, considering the increasing price of ether, and the fact that solidity strings aren't awwful to work with, it's unlikely too many people would use them.

So, here's the issue: one can store raw bytes in variables that are declared as strings, opening up the possibility that unintentionally-null-terminated strings will not cause any problems when going in, but when being accessed, they will be cut off to the first null terminator.

I came across this issue while trying to store my 'websites': I was putting in binary blobs in the contract as strings (because Solidity documentation says that strings are just arrays of bytes, so I thought, why not), and would, once in a while, not get the full page back. I figured it was due to cost issues or as such, and spent an inordinately large amount of time trying to debug this. If you will remember, our last class I claimed that solidity was 'just eating up the errors and acting weirdly with returning strings'. The issue was that I was storing unintentionally-null-terminated binary strings.

Here's the crux of the issue though: nowhere in Solidity docs does it say anything is 'null-terminated'. I downloaded their manual, and searched it on google, and 'null-terminated' appears nowhere. As we all know, null-terminated strings are one of the core causes of bugs in C programs. Considering that Ethereum/Solidity likes to market itself to more of a Javascript-type crowd (high-level language), and the fact that even more experienced programmers may be caught off guard by the documentation never ever mentioning null-termination (since it 'seems' like a high-level language, they probably have their defenses low) I predict that a lot of potential issues might arise due to this.

The most annoying part of it is that it silently truncates the string, without ever letting anyone know that it ever happened. I spent a lot of time trying to figure out what was wrong with my code, so I'm particularly passionate about this issue.

At the moment, I can't think of any compromise that could be dangerous, but with so much unsecured code with so much money sloshing around, I wouldn't be surprised if there are a lot of eyes targeting this particular issue.

[Final realization/opinion: Ethereum can be either a financial medium or a distributed application environment, but not both. The ridiculous increase in price of computation will discourage anyone serious/experienced from sinking resources into it, only to see the price of computation reach absurd levels.]
