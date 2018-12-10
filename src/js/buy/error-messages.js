const errorMessages = {
  invalid_number: `Heads up! Looks like your card number is invalid! 😉`,
  incomplete_number: `Errrr... Who in the world forgets to fully fill in their card number. Are you trying to fool me? 😜`,
  incomplete_expiry: 'Yo! You forgot about the expiry date! 😱',
  incomplete_cvc: `You're missing some cvc numbers! 😉`,
  incorrect_cvc: `Uhh. Looks like your cvc code is incorrect?`,
  incomplete_zip: 'Please fill in your zip code! (No zip code? Just fill in a few random numbers I guess. Still figuring out how this works ¯\\_(ツ)_/¯',
  card_declined: `Uhh. Sorry, but your card was declined 😢. Maybe try another card?`,
  default: `Crap. I have no idea what went wrong, but something did. *(Zell curses and swears)*. Would you mind emailing me and letting me know about this? Thanks so much!`,
  expired_card: `Been a while since you used that card, didn't you? It's expired! 😁`,
  processing_error: `Hmm. An error occured while processing your card. Can you try again later? If it still doesn't work, email me! 😺`,
  noStudentEmail: `You didn't fill in your email address 😉😉`,
  noStudentFirstName: `What's your name, friend? 😄`,
  noPackageName: `Zell, you forgot to add a package name...`,
  noPrice: `Zell, what's the price of this package?`,
  noPaymentType: `Zell, what's the payment type?`,
  noDescription: `Zell, what's the description?`,
  'no tagName found': `Zell, what's the CK tag?`,
  'package is full': `Uh oh, Looks like you&rsquo;re a step too late. The workshop is already full 😢. Would you like to be added to the waiting list? I let you know (before anyone else) when I reopen the workshop.`
}

export default errorMessages
