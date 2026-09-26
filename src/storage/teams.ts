import type { Team } from '../domain/team'

const databaseName = 'dexu-soulsilver'
const storeName = 'teams'

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(databaseName, 1)
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(storeName)) request.result.createObjectStore(storeName, { keyPath: 'id' })
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error ?? new Error('IndexedDB indisponível'))
    request.onblocked = () => reject(new Error('Banco local bloqueado por outra aba.'))
  })
}

export async function getTeam(id: string): Promise<Team | undefined> {
  const db = await openDatabase()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readonly')
    const request = tx.objectStore(storeName).get(id)
    request.onsuccess = () => resolve(request.result as Team | undefined)
    request.onerror = () => reject(request.error ?? new Error('Não foi possível abrir o Time.'))
    tx.oncomplete = () => db.close()
    tx.onabort = () => db.close()
  })
}

export async function listTeams(): Promise<Team[]> {
  const db = await openDatabase()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readonly')
    const request = tx.objectStore(storeName).getAll()
    request.onsuccess = () => resolve((request.result as Team[]).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)))
    request.onerror = () => reject(request.error ?? new Error('Não foi possível listar os Times.'))
    tx.oncomplete = () => db.close()
    tx.onabort = () => db.close()
  })
}

export async function saveTeam(team: Team): Promise<Team> {
  const db = await openDatabase()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite')
    const store = tx.objectStore(storeName)
    let saved: Team | undefined
    const request = store.get(team.id)
    request.onsuccess = () => {
      const existing = request.result as Team | undefined
      if ((existing?.revision ?? 0) !== team.revision) {
        tx.abort()
        return
      }
      saved = { ...team, revision: team.revision + 1 }
      store.put(saved)
    }
    tx.oncomplete = () => {
      db.close()
      resolve(saved!)
    }
    tx.onabort = () => {
      db.close()
      reject(new Error('O Time mudou em outra aba ou a gravação falhou. Sua edição continua nesta aba.'))
    }
    tx.onerror = () => {
      db.close()
      reject(tx.error ?? new Error('Não foi possível salvar o Time.'))
    }
  })
}
