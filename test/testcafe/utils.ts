import * as chokidar from 'chokidar'
import { readFileSync } from 'fs'
export class ActivationEmailListener {
  public async mail (timeoutSeconds: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const watcher = chokidar.watch('./mails')
      watcher.on('add', path => {
        const data = readFileSync(path, { encoding: 'utf-8', flag: 'r' })
        resolve(data)
      })

      setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        watcher.close()
        reject()
      }, timeoutSeconds * 1000)
    })
  }
}
