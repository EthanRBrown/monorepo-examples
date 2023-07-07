import { foo } from '~core'
import chalk from 'chalk'

console.log(chalk.magenta('\n\n>>>> ' + chalk.bold(foo(['grape', 'banana', 'grape', 'apple', 'pear']))))
